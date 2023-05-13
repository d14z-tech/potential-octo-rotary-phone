//Creation

// Builder
class Authentication {
  constructor() {
    this.provider;
  }

  setProvider(provider) {
    this.provider = provider;

    return this;
  }

  build() {
    return this;
  }
}

const obj = new Authentication().setProvider("Firebase").build();

console.log("[Builder] Instance of Authentication:", obj instanceof Authentication);

// Factory
class AuthenticationFactory {
  static createFireBaseAuth() {
    return new Authentication().setProvider("Firebase").build();
  }

  static createGoogleAuth() {
    return new Authentication().setProvider("Google").build();
  }

  static create(provider) {
    if (provider === "Firebase") {
      return this.createFireBaseAuth()
    } else if (provider == "Google") {
      return this.createGoogleAuth();
    } else {
      throw new Error("Provider Not Found.");
    }
  }
}

const authentication = AuthenticationFactory.create("Firebase");

console.log("[Factory] Provider:", authentication.provider);

// Singleton
class SingletonAuthentication {
  static _instance;
  
  static build() {
    if (!this._instance) {
      this._instance = AuthenticationFactory.create("Google");

      return this._instance;
    }
  }
}

const singletonAuth = SingletonAuthentication.build();

console.log("[Singleton] Provider:", singletonAuth.provider);

//Estructure

//Adapter
// class UserAdapter {
//   static factoryAll(users) {
//     return users.map(({ username, id, email }) => {
//       return { id, username, email, isActive: email.contains("@") };
//     })
//   }
// }

// class User {
//   constructor(username, password) {
//     this.username = username;
//     this._password = password;
//   }

//   setPassword(newPassword) {
//     this._password = newPassword;
//   }

//   getPassword() {
//     this._password;
//   }
// }

// const user = new User("hmanzur", "12345");

// console.log(user);

// Behavior

//