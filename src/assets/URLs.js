export const baseURL = "https://7c2a-119-161-98-68.ngrok-free.app";

export const loginURL = `${baseURL}/login`;
export const loginURL_v2 = `${baseURL}/login-timestamp`;

export const allPatientsURL = `${baseURL}/doctor/dashboard/get-reg-patients/`;

export const requestsURL = `${baseURL}/doctor/dashboard/requests/`;

export const acceptRequestURL = `${baseURL}/doctor/dashboard/request-accepted/`;

export const rejectRequestURL = `${baseURL}/doctor/dashboard/request-rejected/`;

export const unverifiedDoctorsURL = `${baseURL}/register/requests`;

export const registerDoctorURL = `${baseURL}/register/doctor`;

export const verifyDoctorURL = `${baseURL}/register/verify`;

export const addPersonalisedContentURL = `${baseURL}/doctor/add/self-article`;

export const fetchAlreadyAddedArticlesURl = `${baseURL}/get/self-article/`;

export const deleteAssignedArticleURL = `${baseURL}/doctor/delete/self-article/`;

export const avgUsageURL = `${baseURL}/analytics/allUsage/`;

export const severityDataURL = `${baseURL}/analytics/severity-list/`;

export const questionaireDataURL = `${baseURL}/admin/get/full-week/`;

export const patientUsageURL = `${baseURL}/analytics/duration/`;

export const patientProgressDataURL = `${baseURL}/analytics/plot-line-chart/`;
