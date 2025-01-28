import type React from "react";
import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  clearError,
  setCredentials,
  setError,
} from "../../store/auth/authSlice";
import Input from "../common/Input";
import Button from "../common/Button";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err: any) {
      dispatch(
        setError(
          err.data?.message || "Login failed. Please check your credentials."
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <Field name="email">
                  {({ field, meta }: any) => (
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      {...field}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }: any) => (
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      {...field}
                      error={
                        meta.touched && meta.error ? meta.error : undefined
                      }
                    />
                  )}
                </Field>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isSubmitting || isLoading}
                  isFullWidth
                >
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
