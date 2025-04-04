import PageTitle from "../../UI/PageTitle";
import Projects from "@/components/AvailableProjects/Projects";
import { Box } from "@mui/material";

function AvailableProjects() {
  return (
    <>
    <PageTitle title="Available Projects" subtitle="You can see all projects or search for the projects that suit you." />
    <Box className="flex justify-around my-10 items-start">
    <Projects />
    </Box>
    </>
  )
}

export default AvailableProjects
