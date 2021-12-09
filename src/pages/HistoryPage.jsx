import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import ModalTransaksi from '../components/ModalTransaksi';
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: [],
            openModal: false,
            detail: {},
            selectedIdx: null
        }
    }

    componentDidMount() {
       this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ transaksi: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    btBatal = (id) => {
        console.log("test", this.state.transaksi[0].status)
        console.log("test", this.state.transaksi)
        axios.patch(`${API_URL}/userTransactions/${id}`, {status: "Pesanan Batal"})
        .then((res) => {
            this.getData()
            this.setState({openModal: false})
        }).catch((err) => {
            console.log(err)
        })
    }

    printHistory = () => {
        return this.state.transaksi.map((value, index) => {
            let badgeColor = value.status.includes("Batal") ? "danger" : "warning"
            return <div className="shadow pb-3 rounded">
                <div className="shadow-sm p-2 bg-dark rounded" style={{ color: "white" }}>
                    <span>{value.date} <Badge color={badgeColor}>{value.status}</Badge> </span>
                    <b style={{ marginLeft: 20 }}>{value.invoice}</b>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].image} width="100%" />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray" }}>
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>  
                        {
                            value.detail.length > 1 ? 
                            <a className="text-muted" style={{ cursor: "pointer" }}>+{value.detail.length - 1} Produk Lainnya</a>
                        : ""
                        }
                    </div>
                    <div className="col-md-3">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.totalPayment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <Button color="danger" onClick={() => this.btBatal(value.id)} >Batalkan Pesanan</Button>
                    <Button color="primary" outline style={{ border: "none" }}
                        onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}>
                        {/* onClick={() => this.setState({ openModal: !this.state.openModal, detail: value, selectedIdx: index })}> */}
                        Lihat Detail Produk
                    </Button>
                </div>
            </div>
        })
    }

    render() {
        return (
            <div className="container p-5">
                {/* Modal detail transaksi */}
                {
                    this.state.detail.id ?
                        <ModalTransaksi
                            btnBatal={this.btBatal}
                            openModal={this.state.openModal}
                            toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                            dataTransaksi={this.state.detail}
                        />
                    : null
                }

                {/* dataTransaksi={this.state.detail}
                    // dataTransaksi={this.state.transaksi[this.state.selectedIdx]}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })} */}

                <h1 className="mb-4">Histori Transaksi Anda</h1>
                {this.printHistory()}
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role
    }
}

export default connect(mapToProps)(HistoryPage);