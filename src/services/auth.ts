const fakeAuthProvider = {
    isAuthenticated: false,
    signIn(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100);
    },
    signOut(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  
  export { fakeAuthProvider };