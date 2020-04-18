class AuthCtrl {
  constructor($state) {
    'ngInject';
    console.log('auth state', $state);
    // grab title from state
    this.title = $state.current.title;
    // grab authtype from statename to configure the template
    this.authType = $state.current.name.replace('app.', '');
  }

  submitForm () {
    this.isSubmitting = true;
    console.log(this.formData);
  }
}

export default AuthCtrl;
