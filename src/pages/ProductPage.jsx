import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap'
import { connect } from 'react-redux';
import { getProductsAction } from '../redux/action';
import { Link } from 'react-router-dom';
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1

        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-2">
                <Card className="bg-white-rounded shadow">
                    <Link to={`/product-detail?id=${value.id}`}
                        style={{ textDecoration: "none", color: "black" }}>
                        <CardImg top
                            src={value.images[0]}
                            width="100%"
                            alt={`${value.nama}-${index}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                            <CardTitle tag="h6" style={{ fontWeight: "bold" }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtPagination = () => {
        // 1-8 data => 1 button
        // 9-16 data => 2 button
        // 17-24 data => 3 button
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    btSearch = () => {
        this.props.getProductsAction(this.inSearchName.value, this.hargaMin.value, this.hargaMax.value)
        // this.props.getProductsAction( {
        //     nama: this.inSearchName.value, 
        //     hargaMin: this.hargaMin.value, 
        //     hargaMax: this.hargaMax.value
        // })
        this.setState({ page: 1 })

    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = ""
        this.hargaMin.value = ""
        this.hargaMax.value = ""
    }

    btSort = () => {
        console.log(this.inSearchSort.value)
        if(this.inSearchSort.value == "harga-asc"){
            this.props.getProductsAction({
                hargaAsc: this.inSearchSort.value
            })
        }else if (this.inSearchSort.value == "harga-desc"){
            this.props.getProductsAction({
                hargaDesc: this.inSearchSort.value
            })
        }else if (this.inSearchSort.value == "nama-asc"){
            this.props.getProductsAction({
                namaAsc: this.inSearchSort.value
            })
        }else if (this.inSearchSort.value == "nama-desc"){
            this.props.getProductsAction({
                namaDesc: this.inSearchSort.value
            })
        }else{
            this.props.getProductsAction()
        }

}

render() {

    return (
        <div className="pt-5">
            <h1 className="text-center mb-3">Products</h1>
            <div className="container">
                <div className="bg-white-rounded shadow px-5 pt-4" >
                    <Row>
                        <Col className="col-4">
                            <Label>Nama</Label>
                            <InputGroup style={{ width: "350px" }}>
                                <Input type="text" id="textSearch" placeholder="Cari Produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </InputGroup>
                        </Col>
                        <Col className="col-4">
                            <Label>Harga</Label>
                            <Row>
                                <Col className="col-6 mr-auto">
                                    <InputGroup style={{ width: "100%", marginRight: "auto" }}>
                                        <Input type="number" id="numMin" placeholder="Min"
                                            innerRef={(element) => this.hargaMin = element} />
                                    </InputGroup>
                                </Col>
                                <Col className="col-6">
                                    <InputGroup style={{ width: "100%" }}>
                                        <Input type="number" id="numMax" placeholder="Max"
                                            innerRef={(element) => this.hargaMax = element} />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-4">
                            <Label>Sort</Label>
                            <InputGroup>
                                <Input type="select" style={{ marginRight: "auto" }}
                                    innerRef={(element) => this.inSearchSort = element}>
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btSort} >Sort</InputGroupText>
                            </InputGroup>

                        </Col>

                    </Row>
                    <div className="py-4 d-flex justify-content-end">
                        <Button color="warning" onClick={this.btReset}>Reset</Button>
                        <Button color="primary" style={{ cursor: "pointer" }} onClick={this.btSearch}>Filter</Button>
                    </div>


                </div>
                <div className="row">
                    {this.printProducts()}
                </div>
                <div className="my-5 text-center">
                    <ButtonGroup>
                        {
                            this.printBtPagination()
                        }
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}
}

const mapToProps = ({ productsReducer }) => {
    // console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction })(ProductsPage);