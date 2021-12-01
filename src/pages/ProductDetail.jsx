import axios from 'axios';
import React from 'react';
import { Button, Collapse, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { API_URL } from '../helper';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty: 1,
            selectedType: {},
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }

    onBtInc = () => {
        console.log(this.state.selectedType.qty)
        if (this.state.selectedType.qty == undefined) {
            this.setState({
                toastOpen: true,
                toastHeader: "Add to cart warning",
                toastIcon: "warning",
                toastMessage: "Pilih type stock"
            })
        } else {
            if (this.state.qty < this.state.selectedType.qty) {
                this.setState({
                    qty: this.state.qty += 1
                });
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Add to cart warning",
                    toastIcon: "warning",
                    toastMessage: "Stok produk tidak cukup"
                })
            }
        }
    }

    onBtDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        } else {
            this.setState({
                toastOpen: true,
                toastHeader: "Add to cart warning",
                toastIcon: "warning",
                toastMessage: "Stok produk salah"
            })
        }
    }

    render() {
        // const search = this.props.location.search;
        // alert(search)
        return (
            <div className="container row p-5 m-auto shadow bg-white rounded mt-4">
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

                {
                    this.state.detail.id &&
                    <>
                        <div className="col-md-1">
                            {this.renderImages()}
                        </div>
                        <div className="col-md-7 text-center">
                            <img className="shadow-sm bg-white rounded" src={this.state.detail.images[this.state.thumbnail]} width="80%" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.nama}</h4>
                                <h6 className="text-mute">{this.state.detail.kategori}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.harga.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <div
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ openType: !this.state.openType })}>
                                    Type: {this.state.selectedType.type}</div>
                                <Collapse isOpen={this.state.openType}>
                                    {
                                        this.state.detail.stock.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={() => this.setState({ selectedType: item, qty: 1 })}
                                                    > {item.type} : {item.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <p className="my-3" style={{ textAlign: "justify" }}>
                                {this.state.detail.deskripsi}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtDec}>
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" value={this.state.qty} style={{ width: "40%", display: 'inline-block' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtInc}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <Button type="button" color="warning" style={{ width: '100%' }} onClick={this.onBtAddToCart}>Add to cart</Button>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default ProductDetail;