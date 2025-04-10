import PageTitle from "../../UI/PageTitle";
import Projects from "@/components/AvailableProjects/Projects";
import { Box } from "@mui/material";

function AvailableProjects() {
  return (
    <>
    {/* <PageTitle title="Available Projects" subtitle="You can see all projects or search for the projects that suit you." /> */}
    <PageTitle title="Available Projects"  />
    <Box >
    <Projects />
    </Box>
    </>
  )
}

export default AvailableProjects
