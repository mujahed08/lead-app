import { useState } from "react";
import { useForm } from "react-hook-form";

export default () => {

    const [loginFailed, setLoginFailed] = useState<boolean>(false)
    const onSubmit = (data:any) => {
        console.log(data)
        setLoginFailed(!loginFailed)
    }

    const { register, formState: { errors }, handleSubmit  } = useForm(); //, setValue

    return <div className="my-4 p-4 col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 border">
    <h3>Login</h3>
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation g-2 row" noValidate>
            <div className="form-floating">
                <input {...register("username", { required: true, maxLength: 10 })}  type="text" className="form-control" id="usernameText" placeholder="placeholder" />
                <label htmlFor="usernameText" className="form-label">Username</label>
                <div className="text-danger">{errors.username?.type === 'required' && "Username is required"}</div>
            </div>
            <div className="form-floating">
                <input {...register("password", { required: true, maxLength: 20 })} type="password" className="form-control" id="passwordPassword" placeholder="placeholder" />
                <label htmlFor="passwordPassword" className="form-label">Password</label>
                <div className="text-danger">{errors.password?.type === 'required' && "Password is required"}</div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
            {loginFailed && <div className="col -12 mx-1 alert alert-danger" role="alert">
                Username or password is not valid.
            </div>}
        </form>
    </div>
</div>
}