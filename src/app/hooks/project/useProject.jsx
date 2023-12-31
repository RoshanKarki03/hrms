import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getProject,
  addProject,
  getProjectById,
  deleteProject,
  addActiveProject,
  editProject,
} from "../../api/project/project-api";
import { toast } from "react-toastify";

/*________________________GET_____________________________________*/
export const useGetProject = () => {
  return useQuery(["getProject"], () => getProject(), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________GET-BY_ID_____________________________________*/
export const useGetProjectById = (id) => {
  return useQuery(["getProjectById", id], () => getProjectById(id), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

/*________________________POST_____________________________________*/
export const useAddProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addProject"], (formData) => addProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Project added successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

/*________________________POST-TO-ACTIVATE-PROJECT_____________________________________*/
export const useAddActivateProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["addProject"], (formData) => addActiveProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Project activated successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`error: ${err.message}`);
    },
  });
};

{
  /*________________________EDIT_____________________________________*/
}
export const useEditProject = async ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["editProject"], (formData) => editProject(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("successfully edited project");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("getProject");
    },
    onError: (err, _variables, _context) => {
      toast.error(`Error: ${(err, message)}`);
    },
  });
};

export const useDeleteProject = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["deleteProject"],
    (id) => deleteProject(id),
    {
      onSuccess: (data, variables, context) => {
        toast.success("Successfully deleted Project");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("getProject");
      },
      onError: (err, _variables, _context) => {
        toast.error(`Error: ${err.message}`);
      },
    }
  );
};