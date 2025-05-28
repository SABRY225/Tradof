import { file, folder_add } from "@/assets/paths";
import { useAuth } from "@/context/AuthContext";

import { deleteProjectFile, uploadProjectFile } from "@/Util/Https/companyHttp";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Workspace({ files, projectId }) {
  const {
    user: { token, role },
  } = useAuth();
  const [currentFiles, setCurrentFiles] = useState(files);
  const [fileId, setFileId] = useState(null);
  const {
    mutate: addFile,
    data,
    isError,
    isPending,
  } = useMutation({
    mutationFn: uploadProjectFile,
    onSuccess: (data) => {
      console.log("Error uploading file:", data.data);
      setCurrentFiles((prevFiles) => [...prevFiles, ...data.data]);
      toast.success("File is added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
      toast.error(error?.message || "upload file is failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });
  const { mutate: deleteFile, isPending: isDeleted } = useMutation({
    mutationFn: deleteProjectFile,
    onSuccess: (data) => {
      console.log("success deleting file:", data);
      const updatedFiles = currentFiles.filter((file) => file.id !== fileId);
      setCurrentFiles(updatedFiles);
      toast.success("File is deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
      toast.error(error?.message || "delete file is failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files);

    files.forEach((file) => {
      if (!file) return;
      const formData = new FormData();
      formData.append("files", file);
      formData.append("isFreelancerUpload", true); // Add it to formData ✨
      console.log("FormData:", formData);
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, value.name); // if it's a file, show file name
        } else {
          console.log(`${key}:`, value); // if it's normal field (like "true"), show value directly
        }
      }

      addFile({
        data: formData,
        isFreelancerUpload: true,
        token,
        projectId,
      });
    });
    e.target.value = null;
  };

  const handleDeleteFile = ({ id }) => {
    setFileId(id);
    deleteFile({ token, fileId: id });
  };

  return (
    <div>
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Workspace
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[20px] py-[10px]">
        {role === "Freelancer" && (
          <div className="flex justify-between items-center">
            <h1 className="text-main-color font-medium">Upload files</h1>
            <div className="flex items-center gap-5">
              {isPending && (
                <FadeLoader
                  color="#000"
                  cssOverride={{ width: "0px", height: "0px" }}
                  height={3}
                  width={3}
                  loading
                  margin={-11}
                  radius={15}
                  speedMultiplier={1}
                />
              )}
              <button
                onClick={handleClick}
                className={`bg-second-color text-white px-2 py-1 rounded-md flex items-center gap-2 font-medium ${
                  isPending ? "opacity-[0.8] cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                <img src={folder_add} alt="" />
                Add files
              </button>

              <input
                type="file"
                name="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}
        {!currentFiles || currentFiles.length === 0 ? (
          <p>No files uploaded for this project.</p>
        ) : (
          <>
            <div className="w-full rounded border border-gray-300 bg-[#E5E5FF]">
              <table className="table-auto text-left w-full border-collapse">
                <thead>
                  <tr className="bg-[#E5E5FF]">
                    <th className="px-2 py-1 text-[12px] text-main-color font-semibold">
                      Loaded file
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentFiles.map((file, index) => {
                    const fileUrl = file.filePath
                      ? file.filePath.replace(/\\/g, "/")
                      : null;

                    return (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-[#F5F5FF]" : "bg-[#E5E5FF]"
                        }
                      >
                        <td className="px-2 py-1 text-[12px]">
                          {file.fileName}
                          <div className="text-[8px] text-gray-500">
                            {formatFileSize(file.fileSize)} · Type:{" "}
                            {getFileType(file.fileType)}
                          </div>
                        </td>
                        <td className="flex justify-end items-center mx-5 mt-[6px] gap-5">
                          {fileId === file.id && isDeleted && (
                            <FadeLoader
                              color="#000"
                              cssOverride={{ width: "0px", height: "0px" }}
                              height={3}
                              width={3}
                              loading
                              margin={-11}
                              radius={15}
                              speedMultiplier={1}
                            />
                          )}
                          <div className="flex items-center justify-center h-full">
                            <button className="bg-main-color text-white px-2 py-1 rounded mr-4 text-[10px] hover:bg-indigo-600 transition">
                              <Link to={fileUrl} target="_blank">
                                Download
                              </Link>
                            </button>

                            {role === "Freelancer" && (
                              <button
                                className={`text-red-600 font-medium text-[10px] hover:underline ${
                                  fileId === file.id && isDeleted
                                    ? "opacity-[0.8] cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleDeleteFile({ id: file.id })
                                }
                                disabled={fileId === file.id && isDeleted}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileType(typeId) {
  switch (typeId) {
    case 0:
      return "PDF";
    case 1:
      return "Excel";
    case 2:
      return "Word";
    case 3:
      return "PNG";
    case 4:
      return "JPEG";
    case 5:
      return "JPG";
    default:
      return "Unknown";
  }
}
