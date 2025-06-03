import { files, folder, timer } from "@/assets/paths";
import ButtonFelid from "@/UI/ButtonFelid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProjectFile, uploadProjectFile } from "@/Util/Https/companyHttp";
import { useAuth } from "@/context/AuthContext";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import getTimeAgo from "@/Util/getTime";

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

export default function ProjectDetails({
  project,
  projectFiles,
  translatedFiles,
  viewOnly,
  isCanceled
}) {
  const {
    user: { token, role },
  } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileId, setFileId] = useState(null);

  const [ProjectFiles, setFiles] = useState(projectFiles); // example
  const {
    mutate: addFile,
    data,
    isError,
    isPending: isAdding,
  } = useMutation({
    mutationFn: uploadProjectFile,
    onSuccess: (data) => {
      console.log("success uploading file:", data.data);
      setFiles((prevFiles) => [...prevFiles, ...data.data]);
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

  const { mutate: deleteFile, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectFile,
    onSuccess: (data, variables) => {
      console.log("success deleting file:", data);
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== variables.fileId)
      );

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

  const handleCheckboxChange = (fileId) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFile = (fileId) => {
    if (isCanceled) return;
    setFileId(fileId);
    deleteFile({ token, fileId });
  };
  const handleDeleteSelected = () => {
    // Delete the selected files one by one using useMutation
    selectedFiles.forEach((fileId) => {
      deleteFile({ token, fileId });
    });

    // Optionally, clear the selection after deletion
    setSelectedFiles([]);
  };

  const handleFileChange = (e) => {
    if (isCanceled) return;
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
        isFreelancerUpload: false,
        token,
        projectId: project.id,
      });
    });
    e.target.value = null;
  };

  // console.log(project);
  return (
    <div>
      <h1 className="italic border-b-2 border-main-color w-fit ml-2 pl-2">
        Project details
      </h1>
      <div className="space-y-[20px] bg-card-color rounded-[8px] px-[20px] py-[20px] relative">
        <h1 className="text-[20px] font-medium relative before:content-[''] before:absolute before:bg-main-color before:w-4 before:h-[2px] before:rounded before:-left-[20px] before:top-1/2 before:-translate-y-1/2">
          {project?.name}
        </h1>
        <div className="font-roboto-condensed">
          <h2 className="text-main-color text-[13px] font-semibold">
            Description of project
          </h2>
          <p className="font-roboto-condensed">{project?.description}</p>
        </div>
        <div>
          <h1 className="text-main-color text-[13px] font-semibold">
            Language pair
          </h1>
          <p className="font-roboto-condensed">
            {project?.languageFrom.languageName} (
            {project?.languageFrom.countryName}) -{" "}
            {project?.languageTo.languageName} (
            {project?.languageTo.countryName})
          </p>
        </div>
        {viewOnly && (
          <div>
            <h1 className="text-main-color text-[13px] font-semibold">Price</h1>
            <p className="font-roboto-condensed">{project?.price + "$"} </p>
          </div>
        )}
        <div>
          <h1 className="text-main-color text-[13px] font-semibold">
            IETF tag
          </h1>
          <p className="font-roboto-condensed">
            {project?.languageFrom.languageCode}-
            {project?.languageFrom.countryCode} -{" "}
            {project?.languageTo.languageCode}-{project?.languageTo.countryCode}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {projectFiles && (
            <div>
              <h1 className="text-main-color text-[13px] font-semibold">
                Attachment files
              </h1>
              <Dialog>
                <DialogTrigger>
                  <ButtonFelid
                    as="div"
                    text="Files"
                    classes="bg-second-color px-5 py-[2px] font-regular flex flex-row-reverse"
                    icon={files}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[900px] h-fit">
                  <DialogHeader>
                    <DialogTitle>Project Files</DialogTitle>
                    <DialogDescription className="text-black">
                      {role === "CompanyAdmin" && !viewOnly && !isCanceled && (
                        <div className="w-full flex flex-row-reverse my-2 gap-4 items-center ">
                          <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-1 border border-gray-500 rounded"
                            type="button"
                          >
                            Delete Selected
                          </button>
                          <div className="px-4 py-1 border border-gray-500 rounded">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer text-blue-500"
                            >
                              Add Files
                            </label>
                            <input
                              type="file"
                              id="file-upload"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </div>
                          {(isDeleting || isAdding) && (
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
                        </div>
                      )}
                      <div className="overflow-y-auto custom-scrollbar h-[450px] border p-2 border-2 shadow-inner">
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {ProjectFiles.map((file) => {
                            const fileUrl = file.filePath
                              ? file.filePath.replace(/\\/g, "/")
                              : null;

                            return (
                              <li
                                key={file.id}
                                className="flex flex-col items-center"
                              >
                                <div className="border-2 rounded-md w-fit p-2">
                                  {role === "CompanyAdmin" && !viewOnly && !isCanceled && (
                                    <div className="relative z-[1]">
                                      <input
                                        type="checkbox"
                                        className="absolute top-2 right-2 w-4 h-4"
                                        onChange={() =>
                                          handleCheckboxChange(file.id)
                                        }
                                        checked={selectedFiles.includes(
                                          file.id
                                        )}
                                      />

                                      <button
                                        onClick={() =>
                                          handleDeleteFile(file.id)
                                        }
                                        className="z-[2] absolute w-5 h-5 top-2 left-2 flex justify-center items-center rounded-full bg-red-500 text-white text-xs"
                                        title="Delete File"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                  <div>
                                    <img
                                      src={folder}
                                      alt="folder icon"
                                      className="w-[100px] opacity-25"
                                    />
                                  </div>
                                  <div className="text-[8px] text-gray-500 text-center">
                                    {formatFileSize(file.fileSize)} · Type:{" "}
                                    {getFileType(file.fileType)}
                                  </div>
                                </div>
                                <div className="mt-2 text-center text-sm">
                                  <Link to={fileUrl} target="_blank">
                                    {file.fileName}
                                  </Link>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {translatedFiles && (
            <div>
              <h1 className="text-main-color text-[13px] font-semibold">
                Translation files
              </h1>
              <Dialog>
                <DialogTrigger>
                  <ButtonFelid
                    as="div"
                    text="Files"
                    classes="bg-second-color px-5 py-[2px] font-regular flex flex-row-reverse"
                    icon={files}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[900px] h-fit">
                  <DialogHeader>
                    <DialogTitle>Project Files</DialogTitle>
                    <DialogDescription className="text-black">
                      {role === "CompanyAdmin" && !viewOnly && !isCanceled && (
                        <div className="w-full flex flex-row-reverse my-2 gap-4 items-center ">
                          <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-1 border border-gray-500 rounded"
                            type="button"
                          >
                            Delete Selected
                          </button>
                          <div className="px-4 py-1 border border-gray-500 rounded">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer text-blue-500"
                            >
                              Add Files
                            </label>
                            <input
                              type="file"
                              id="file-upload"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </div>
                          {(isDeleting || isAdding) && (
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
                        </div>
                      )}
                      <div className="overflow-y-auto custom-scrollbar h-[450px] border p-2 border-2 shadow-inner">
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {translatedFiles.map((file) => {
                            const fileUrl = file.filePath
                              ? file.filePath.replace(/\\/g, "/")
                              : null;

                            return (
                              <li
                                key={file.id}
                                className="flex flex-col items-center"
                              >
                                <div className="border-2 rounded-md w-fit p-2">
                                  {role === "CompanyAdmin" && !viewOnly && (
                                    <div className="relative z-[1]">
                                      <input
                                        type="checkbox"
                                        className="absolute top-2 right-2 w-4 h-4"
                                        onChange={() =>
                                          handleCheckboxChange(file.id)
                                        }
                                        checked={selectedFiles.includes(
                                          file.id
                                        )}
                                      />

                                      <button
                                        onClick={() =>
                                          handleDeleteFile(file.id)
                                        }
                                        className="z-[2] absolute w-5 h-5 top-2 left-2 flex justify-center items-center rounded-full bg-red-500 text-white text-xs"
                                        title="Delete File"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                  <div>
                                    <img
                                      src={folder}
                                      alt="folder icon"
                                      className="w-[100px] opacity-25"
                                    />
                                  </div>
                                  <div className="text-[8px] text-gray-500 text-center">
                                    {formatFileSize(file.fileSize)} · Type:{" "}
                                    {getFileType(file.fileType)}
                                  </div>
                                </div>
                                <div className="mt-2 text-center text-sm">
                                  <Link to={fileUrl} target="_blank">
                                    {file.fileName}
                                  </Link>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <img src={timer} alt="icon" width={15} />
          <p className="text-gray-500 text-[12px]">
            {getTimeAgo(project?.creationDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
