import axios from 'axios';
import React from 'react';
import { Button, NavItem, Table } from 'reactstrap';
import ModalEditProduct from '../components/ModalEditProduk';

const API_URL = "http://localhost:2000"

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen: false,
            detailProduk: {}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                console.log(res.data)
                this.setState({ productList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    printProduk = () => {
        return this.state.productList.map((value, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    <img src={value.images[0]} width="80%" alt={value.nama + index} />
                </td>
                <td>{value.nama}</td>
                <td>{value.brand}</td>
                <td>{value.kategori}</td>
                <td>Rp. {value.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning"
                    onClick={() => this.setState({ detailProduk: value, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button> </td>
                <td><Button size="sm" color="danger" onClick={() => this.onBtDelete(value.idproduct)}>Delete</Button></td>
            </tr>
        })

    }

    render() {
        return (
            <div className="container p-3">
                <h3 className="text-center">Product Management</h3>
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Nama</th>
                            <th>Brand</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProduk()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductManagement;