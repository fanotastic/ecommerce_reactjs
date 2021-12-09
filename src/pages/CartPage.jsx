import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, FormGroup, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/action';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ongkir: 0
        }
    }

    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <div className="row shadow p-1 mb-3 bg-white rounded" >
                    <div className="col-md-2">
                        <img src={value.image} width="100%" />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.nama}</h5>
                        <h4 style={{ fontWeight: 'bolder' }}>Rp {value.harga.toLocaleString()}</h4>
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.type}</h5>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtDec(index)}>
                                        remove
                                    </span>
                                    <Input placeholder="qty" value={value.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtInc(index)}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h4>Rp {(value.harga * value.qty).toLocaleString()}</h4>
                        </div>
                        <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.onBtRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    onBtInc = (index) => {
        let temp = [...this.props.cart];
        temp[index].qty += 1
        this.props.updateUserCart(temp, this.props.iduser)
    }

    onBtDec = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            temp.splice(index, 1)
        }
        this.props.updateUserCart(temp, this.props.iduser);
    }

    onBtRemove = (index) => {
        let temp = [...this.props.cart];
        temp.splice(index, 1)
        this.props.updateUserCart(temp, this.props.iduser);
    }

    onBtCheckOut = () => {
        // yang disimpan = iduser, username, invoice, date, note, total_payment, detail=array, status="Menunggu konfirmasi"

        const d = new Date();
        let total = parseInt(this.totalPayment()) + parseInt(this.ongkir.value)
        console.log("id", this.props.iduser, "username", this.props.username)
        let data = {
            iduser: this.props.iduser,
            username: this.props.username,
            invoice: `#INV/${d.getTime()}`,
            date: d.toLocaleString(),
            totalPayment: total,
            ongkir: parseInt(this.ongkir.value),
            note: this.note.value,          // [...] itu mksdnya mutable data
            detail: [...this.props.cart], // dikasih ... itu adl temporary agar data sumber aslinya tetap ada
            status: "Menunggu konfirmasi",
        }
        axios.post(`${API_URL}/userTransactions`, data)
            .then((response) => {
                this.props.updateUserCart([], this.props.iduser)
                // console.log(response)
            }).catch((err) => {
                console.log(err)
            })

        console.log(data)
    }


    totalPayment = () => {
        let total = 0;

        this.props.cart.forEach((value, index) => total += value.qty * value.harga)
        return total
    }

    render() {
        return (<div>
            <h1 className="text-center mt-5">Keranjang Belanja</h1>
            <div className="row m-1">
                <div className="col-8">
                    {this.printCart()}
                </div>
                <div className="col-4">
                    <div className="shadow p-4 mb-3 bg-white rounded">
                        <h3 style={{}}>Total Payment</h3>
                        <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment()}</h2>
                        <FormGroup>
                            <Label for="ongkir">Biaya Pengiriman</Label>
                            <Input type="number" id="ongkir" innerRef={elemen => this.ongkir = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="note">Notes</Label>
                            <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps, { updateUserCart })(CartPage);