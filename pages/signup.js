import Head from "next/head";
import Layout from "../components/layout/layout";

const SignUp = () => {

    return (
      <Layout title='Signup'>
        <Head>
        <title>Signup</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="form-container">
      <div className="form-wrapper">
          <h2>Signup</h2>
        <form className="signin-signup-form-page">
          <h5>Create your account</h5>
          <br></br>
          <input
            type="text"
            placeholder="Your Name"
          />
          <input
            type="text"
            placeholder="Username"
          />
          <input
            type="text"
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Enter New Password"
          />
          <div className="signup__buttons-wrapper"></div>
          <button type="submit" className="submit">
            Signup
          </button>
        </form>
        <div className="quick-signin-wrapper">
            <i className="fa-brands fa-github fa-xl"></i> Github &nbsp; &nbsp;
            <i className="fa-brands fa-google fa-xl"></i> Google
          </div>
      </div>
      </div>
      </Layout>
    );
  };
  
  export default SignUp;