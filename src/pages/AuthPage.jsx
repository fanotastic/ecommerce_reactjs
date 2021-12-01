import axios from 'axios';
import React from 'react';
import { Container, FormGroup, Input, Label, Button, InputGroupText, InputGroup, Toast, ToastHeader, ToastBody, } from 'reactstrap';
import { loginAction } from '../redux/action'
import { connect } from 'react-redux' // utk menghubungkan fungsi action dgn fungsi reducer


const API_URL = "http://localhost:2000"

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logPassType: "password",
            logPassShow: "Show",
            regPassType: "password",
            regPassShow: "Show",
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }

    btShowPassRegister = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    btLogin = () => {
        // alert(`${this.emailLogin.value}, ${this.passwordLogin.value}`)
        this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
    }

    btRegis = () => {
        if (this.userReg.value == "" || this.emailReg.value == "" || this.passwordReg.value == "" || this.confPasswordReg.value == "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastMessage: "Isi semua data"
            })
        } else {
            if (this.passwordReg.value == this.confPasswordReg.value) {
                if (this.emailReg.value.includes("@")) {
                    axios.post((`${API_URL}/users`), {
                        username: this.userReg.value,
                        email: this.emailReg.value,
                        password: this.passwordReg.value,
                        role: "user",
                        status: "Active"
                    }).then((response) => {
                        console.log(response)
                        this.setState({
                            toastOpen: true,
                            toastHeader: "Register Status",
                            toastIcon: "success",
                            toastMessage: "Registrasi Berhasil"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                } else {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastMessage: "Email salah"
                    })
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Password tidak sesuai"
                })
            }
        }
    }


    render() {
        return (
            <Container className="p-5">
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                        <ToastHeader icon={this.state.toastIcon}
                            toggle={() => this.setState({ toastOpen: false })}>
                            {this.state.toastHeader}
                        </ToastHeader>
                        <ToastBody>
                            {this.state.toastMessage}
                        </ToastBody>
                    </Toast>
                </div>
                <h2 style={{ fontWeight: "Bold", textAlign: "center" }}>Pilihan Masuk</h2>
                <p className="text-center">Masuk dan selesaikan pesanan dengan data diri anda atau daftar untuk menikmati semua layanan</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan masuk ke akun anda</h3>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan email anda"
                                innerRef={(element) => this.emailLogin = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPasswordLogin">Password</Label>
                            <InputGroup>
                                <Input type={this.state.logPassType} id="textPasswordLogin" placeholder="Masukkan password anda"
                                    innerRef={(element) => this.passwordLogin = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassLogin}>
                                    {this.state.logPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btLogin}>Masuk</Button>
                    </div>
                    <div className="col-6">
                        <h3 className="text-center py-3">Silahkan buat akun baru</h3>
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" placeholder="Masukkan Username anda"
                                innerRef={(element) => this.userReg = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan email anda"
                                innerRef={(element) => this.emailReg = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPasswordRegister">Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPasswordRegister" placeholder="Masukkan password anda"
                                    innerRef={(element) => this.passwordReg = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegister}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPasswordconfirm">Confirm Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPasswordConfirm" placeholder="Masukkan password anda"
                                    innerRef={(element) => this.confPasswordReg = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegister}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btRegis}>Daftar</Button>
                    </div>
                </div>
            </Container>

        );
    }
}

export default connect(null, { loginAction })(AuthPage);