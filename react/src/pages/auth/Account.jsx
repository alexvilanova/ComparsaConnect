import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../../slices/auth/thunks';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
    const { userData } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            setValue('name', userData.name);
            setValue('username', userData.username);
            setValue('email', userData.email);
        }
    }, [userData, setValue]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const onSubmit = (data) => {
        console.log(data);
        dispatch(updateProfile({ name: data.name, email: data.email, username: data.username }));
    };
    return (
        <Layout>
            <div className=''>
                <h2>Profile</h2>
                {userData ? (
                    <form className="table" onSubmit={handleSubmit(onSubmit)}>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="name">Nombre</label>
                            </div>
                            <div className="table-cell">
                                <input type="text" id="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} {...register("name", { required: true, pattern: /^[^\s]+(?:\s[^\s]+)+$/ })} />
                                {errors.name && errors.name.type === "required" && (
                                    <span className="invalid-feedback">Campo obligatorio</span>
                                )}
                                {errors.name && errors.name.type === "pattern" && (
                                    <span className="invalid-feedback">El campo debe contener mínimo 2 palabras</span>
                                )}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="username">Nombre de usuario</label>
                            </div>
                            <div className="table-cell">
                                <input type="text" id="username" className={`form-control ${errors.username ? "is-invalid" : ""}`} {...register("username", { required: true, minLength: 2, maxLength: 20 })} />
                                {errors.username && errors.username.type === "required" && (
                                    <span className="invalid-feedback">Campo obligatorio</span>
                                )}
                                {errors.username && errors.username.type === "minLength" && (
                                    <span className="invalid-feedback">El campo debe contener mínimo 2 letras</span>
                                )}
                                {errors.username && errors.username.type === "maxLength" && (
                                    <span className="invalid-feedback">El campo puede contener un máximo de 20 letras</span>
                                )}
                                {errors.username && errors.username.type === "custom" && (
                                    <span className="text-danger">{errors.username.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="email">Correo electrónico</label>
                            </div>
                            <div className="table-cell">
                                <input type="email" id="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
                                {errors.email && errors.email.type === "required" && (
                                    <span className="invalid-feedback">Campo obligatorio</span>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <span className="invalid-feedback">Correo no válido</span>
                                )}
                                {errors.email && errors.email.type === "custom" && (
                                    <span className="text-danger">{errors.email.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">
                                <label htmlFor="created_at">Fecha de creación</label>
                            </div>
                            <div className="table-cell">
                                <input type="date" id="created_at" value={formatDate(userData.created_at)} readOnly disabled className="form-control" />
                            </div>
                        </div>
                        {success && (
                            <div className="alert alert-success">
                                Se han aplicado los cambios correctamente
                            </div>
                        )}
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary btn-block">Aplicar cambios</button>
                        </div>
                    </form>
                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
        </Layout>
    );
}

export default Account;