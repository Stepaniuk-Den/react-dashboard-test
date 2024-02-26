export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserName = (state) => state.auth.name;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthId = (state) => state.auth.userId;
export const selectAuthData = (state) => state.auth;
export const selectIsModalOpen = (state) => state.auth.isModalOpen;
