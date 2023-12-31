import React from 'react';
import { useEditProject } from "../useProject";
import { useFormik } from 'formik';
import { ProjectSchema } from '../validation/ProjectSchema';
import { useGetEmployee } from '../../employee/useEmployee';

const useEditProjectForm = (data) => {
    const { mutate } = useEditProject({});
    const { data: employeeData }  = useGetEmployee();

    const getProjectLeaderName = (projectLeaderId) => {
        return(
            employeeData?.find((employee) => employee.id === projectLeaderId)
            ?.firstName || projectLeaderId
        )
    }

    const formik = useFormik({
        initialValues: {
            projectName: data?.projectName || "",
            startDate: data?.startDate || "",
            endDate: data?.endDate || "",
            projectStatus: data?.projectStatus || "",
            projectLeaderId: getProjectLeaderName(data?.projectLeaderId) || data?.projectLeaderId || "",
            companyId: data?.associateCompanies[0]?.companyName || "",
            id: data?.id || "",
        },
        validationSchema: ProjectSchema,
        enableReinitialize: "true",
        onSubmit: (values) => {
            handleRequest(values);
        }
    });

    const handleRequest = (values) => {
        values = { ...values };
        mutate(values, formik);
    };
    
    return { formik };

};

export default useEditProjectForm;