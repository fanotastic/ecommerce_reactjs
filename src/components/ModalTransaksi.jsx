import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, Card } from 'reactstrap';

const ModalTransaksi = (props) => {

    const printProduk = () => {
        return props.dataTransaksi.detail.map((value, index) => {
            return (<Card>
                <div className="row d-flex align-items-center">
                    <div className="col-md-3">
                        <img src={props.dataTransaksi.detail[index].image} alt="masukga" width="100%" />
                    </div>
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <p>{props.dataTransaksi.detail[index].nama}</p>
                        <p className="text-muted">{props.dataTransaksi.detail[index].qty} x Rp. {props.dataTransaksi.detail[index].harga.toLocaleString()}</p>
                    </div>
                    <div className="col-md-5 text-center">
                        <p>Total Harga</p>
                        <p>Rp. {((props.dataTransaksi.detail[index].qty) * (props.dataTransaksi.detail[index].harga)).toLocaleString()}</p>
                    </div>
                </div>
            </Card>
            )
        })

    }

    return (

        <Modal isOpen={props.openModal}
            toggle={props.toggleModal} size="lg">
            <ModalHeader className="d-block shadow-sm">
                <span className="material-icons" style={{ float: 'right' }} style={{ cursor: "pointer" }} onClick={{ isOpen: true }}>
                    close
                </span>
                <div style={{ textAlign: "center" }}>
                    <h4 style={{ fontWeight: "700" }}>Detail Transaksi</h4>
                </div>
            </ModalHeader>
            {console.log("test", props.dataTransaksi.detail)}
            {console.log("test2", props.dataTransaksi)}
            {
                props.dataTransaksi.detail ? <ModalBody>
                    <div className="row">
                        <div className="col-md-8 px-0" style={{ backgroundColor: "#F3F4F5" }}>
                            <Card className="px-4" style={{ border: "none" }}>
                                <p style={{ fontWeight: "bold" }}>{props.dataTransaksi.status}</p>
                                <span className="d-flex justify-content-between">
                                    <p>No. Invoice</p>
                                    <p style={{ fontWeight: "bold", color: "#3498db" }}>{props.dataTransaksi.invoice}</p>
                                </span>
                                <span className="d-flex justify-content-between">
                                    <p>Tanggal Pembelian</p>
                                    <p>{props.dataTransaksi.date}</p>
                                </span>
                            </Card>
                            <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                <p style={{ fontWeight: "bold" }}>Detail Produk</p>
                                <div style={{ height: "25vh", overflow: "auto", overflowX: "hidden"}}>
                                    {printProduk()}
                                </div>
                            </Card>
                            <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
                                <p style={{ fontWeight: "bold" }}>Rincian Pembayaran</p>
                                <Card>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Harga (xx barang)</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {props.dataTransaksi.totalPayment.toLocaleString()}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Ongkos Kirim</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. {props.dataTransaksi.ongkir.toLocaleString()}</p>
                                    </span>
                                    <span className="d-flex justify-content-between">
                                        <p>Total Bayar</p>
                                        <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp.  {((props.dataTransaksi.totalPayment) + (props.dataTransaksi.ongkir)).toLocaleString()}</p>
                                    </span>
                                </Card>
                            </Card>
                        </div>
                        <div className="col-md-4 p-3">
                            <Button outline size="lg" className="my-2" style={{ width: "100%" }}>
                                Chat Penjual
                            </Button>
                            <Button outline size="lg" style={{ width: "100%", textAlign: "center" }}>
                                Bantuan
                            </Button>
                            <Button 
                            outline size="lg" 
                            outline color="danger" 
                            className="my-2" 
                            style={{ width: "100%", textAlign: "center" }} 
                            onClick={() => props.btnBatal(props.dataTransaksi.id)}
                            isOpen={!props.openModal}>
                                Batal
                            </Button>
                        </div>
                    </div>
                </ModalBody>
                    : <p>NO DATA</p>
            }
        </Modal>
    )


}


export default ModalTransaksi;




































// import React, { useDebugValue } from 'react';
// import { Button, Card, Modal, ModalBody, ModalHeader } from 'reactstrap'

// const ModalTransaksi = (props) => {

//     return (
//         <Modal isOpen={props.openModal}
//             toggle={props.toggleModal} size="lg">
//             <ModalHeader className="d-block shadow-sm">
//                 <span className="material-icons" style={{ float: "right" }}>
//                     close
//                 </span>
//                 <div style={{ textAlign: "center" }}>
//                     <h4 style={{ fontWeight: "700" }}>Detail Transaksi</h4>
//                 </div>
//             </ModalHeader>
//             <ModalBody>
//                 {console.log("datatransaksi", props.dataTransaksi)}
//                 {
//                     props.dataTransaksi ?
//                         <div className="row">
//                             <div className="col-md-8 px-0" style={{ backgroundColor: "#F3F4F5" }}>
//                                 <Card className="px-4 rounded" style={{ border: "none" }}>
//                                     <p style={{ fontWeight: "bold" }}>{props.dataTransaksi.status}</p>
//                                     <span className="d-flex justify-content-between">
//                                         <p>No. Invoice</p>
//                                         <p style={{ fontWeight: "bold", color: "#3498db" }}>{props.dataTransaksi.invoice}</p>
//                                     </span>
//                                     <span className="d-flex justify-content-between">
//                                         <p>Tanggal Pembelian</p>
//                                         <p>{props.dataTransaksi.date}</p>
//                                     </span>
//                                 </Card>
//                                 <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
//                                     <p style={{ fontWeight: "bold" }}>Detail Produk</p>
//                                     <Card>
//                                         <div className="row">

//                                             <div className="col-md-1">
//                                                 {/* image */}
//                                                 {/* <img src={props.dataTransaksi[0].image} width="100%"/> */}
//                                             </div>
//                                             <div className="col-md-7">
//                                                 {/* nama, qty dan harga per pcs */}
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <p>Total Harga</p>
//                                                 {/* Total harga */}
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 </Card>
//                                 <Card className="px-4 py-3 mt-2 rounded" style={{ border: "none" }}>
//                                     <p style={{ fontWeight: "bold" }}>Rincian Pembayaran</p>
//                                     <span className="d-flex justify-content-between">
//                                         <p>Total Harga (xx barang)</p>
//                                         <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
//                                     </span>
//                                     <span className="d-flex justify-content-between">
//                                         <p>Total Ongkos Kirim</p>
//                                         <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
//                                     </span>
//                                     <span className="d-flex justify-content-between">
//                                         <p>Total Bayar</p>
//                                         <p style={{ fontWeight: "bold", color: "#3498db" }}>Rp. xx.xxx.xxx</p>
//                                     </span>
//                                 </Card>
//                             </div>
//                             <div className="col-md-4 p-3">
//                                 <Button
//                                     outline
//                                     size="lg"
//                                     className="my-2"
//                                     style={{ width: "100%" }}>
//                                     Chat Penjual
//                                 </Button>
//                                 <Button outline size="lg" style={{ width: "100%" }}>Bantuan</Button>
//                             </div>
//                         </div>
//                         : <p style={{ textAlign: "center" }}>No Data!</p>
//                 }

//             </ModalBody>
//         </Modal>
//     )
// };

// const DetailProduk = () => {
//     return props.dataTransaksi.map((value, index) => {
//         return <Card>
//             <div className="row">

//                 <div className="col-md-1">
//                     {/* image */}
//                     {/* <img src={props.dataTransaksi[0].image} width="100%"/> */}
//                 </div>
//                 <div className="col-md-7">
//                     {/* nama, qty dan harga per pcs */}
//                 </div>
//                 <div className="col-md-4">
//                     <p>Total Harga</p>
//                     {/* Total harga */}
//                 </div>
//             </div>
//         </Card>
//     })
// }

// export default ModalTransaksi;