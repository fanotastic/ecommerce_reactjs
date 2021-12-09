import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, ButtonGroup, Input, FormGroup, Label } from 'reactstrap';
import ModalEditProduct from '../components/ModalEditProduk';
import ModalProduct from '../components/ModalProduct';
import { API_URL } from '../helper';
import { getProductsAction, getProductsSort } from '../redux/action';

class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen: false,
            modalOpen: false,
            detailProduk: {},
            thumbnailIdx: 0,
            selectedIndex: null,
            page: 1,
            limit: 4
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
        let { page, limit } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * limit : page - 1, page * limit).map((item, index) => {
            return <tr>
                <td>{page > 1 ? (page - 1) * limit + index + 1 : index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    {
                        this.state.selectedIndex == index ?
                            <img src={item.images[this.state.thumbnailIdx]} width="80%" alt={item.nama + index} />
                            :
                            <img src={item.images[0]} width="80%" alt={item.nama + index} />
                    }
                    <div>
                        {item.images.map((val, idx) => {
                            return <img src={val} width="20%" alt={item.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIndex: index })} />
                        })}
                    </div>
                </td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.kategori}</td>
                <td>Rp. {item.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                    <Button size="sm" color="danger" onClick={() => this.onBtDelete(item.id)}>Delete</Button></td>
            </tr>
        })
    }

    printBtPagination = () => {
        // 1-8 data => 1 button
        // 9-16 data => 2 button
        // 17-24 data => 3 button
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / this.state.limit); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    onBtDelete = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductsAction();
            }).catch((err) => {
                console.log(err)
            })
    }

    btSearch = () => {
        this.props.getProductsAction({
            nama: this.inSearchName.value,
            hargaMax: this.inSearchMax.value,
            hargaMin: this.inSearchMin.value
        })
        this.setState({ page: 1 })
    }

    handleSort = (e) => {
        this.props.getProductsSort({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }

    render() {
        return (
            <div className="p-5 container-fluid">
                <h3 className="text-center">Produk Management</h3>
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                <ModalProduct modalOpen={this.state.modalOpen}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })}
                    getData={this.getData}
                />
                <div className="row">
                    <div className="col-md-3 p-1">
                        <div className="shadow-sm p-3">
                            <Button type="button" color="success" style={{ width: "100%" }} onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                            <div className="d-flex d-md-block mt-4">
                                <FormGroup>
                                    <Label>Nama</Label>
                                    <Input type="text" id="text" placeholder="Cari produk"
                                        innerRef={(element) => this.inSearchName = element} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Harga</Label>
                                    <div className="d-flex">
                                        <Input type="number" id="numb1" placeholder="Minimum"
                                            innerRef={(element) => this.inSearchMin = element} />
                                        <Input type="number" id="numb2" placeholder="Maksimum"
                                            innerRef={(element) => this.inSearchMax = element} />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Sort</Label>
                                    <Input type="select" onChange={this.handleSort}>
                                        <option value="harga-asc">Harga Asc</option>
                                        <option value="harga-desc">Harga Desc</option>
                                        <option value="nama-asc">A-Z</option>
                                        <option value="nama-desc">Z-A</option>
                                        <option value="id-asc">Reset</option>
                                    </Input>
                                </FormGroup>

                            </div>
                            <div className="pt-2" style={{ textAlign: "end" }}>
                                <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                                <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btSearch}>Filter</Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
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
                        <div className="my-5 d-flex justify-content-center">
                            <Input type="select" value={this.state.limit} style={{ width: 75, marginRight: 10 }}
                                onChange={(e) => this.setState({ limit: parseInt(e.target.value) })}>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                                <option value="16">16</option>
                            </Input>
                            <ButtonGroup>
                                {
                                    this.printBtPagination()
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        productsList: state.productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, getProductsSort })(ProductManagement);