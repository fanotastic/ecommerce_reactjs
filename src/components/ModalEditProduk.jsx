import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button, Row, Col } from 'reactstrap';

class ModalEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: props.detailProduk.stock,
            images: props.detailProduk.images,
            edit: false
        }
    }

    printStock = () => {
        if (this.props.detailProduk.stock) {
            return this.props.detailProduk.stock.map((item, index) => {
                return <Row>
                    <Col>
                        <Input disabled={!this.state.edit} type="text" defaultValue={item.type} placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input disabled={!this.state.edit} type="number" defaultValue={item.qty} placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    printImages = () => {
        if (this.props.detailProduk.images) {
            return this.props.detailProduk.images.map((item, index) => {
                return <Input disabled={!this.state.edit} type="text" defaultValue={item} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
    }

    render() {
        let { nama, deskripsi, brand, kategori, harga } = this.props.detailProduk
        return (

            // toggle itu semacam onClick jd isinya harus function
            // toggle itu lambang silang yg diatas utk close
            // disabled itu supaya input nya tidak bs diganti dan nilainya boolean (default: false)
            // this.state.edit --> itu utk ganti state edit yg tdnya default false

            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input disabled={!this.state.edit} type="text" id="textNama" defaultValue={nama}
                            innerRef={(element) => { this.textNama = element }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={deskripsi} id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textBrand">Brand</Label>
                                <Input disabled={!this.state.edit} type="text" defaultValue={brand} id="textBrand" innerRef={elemen => this.inBrand = elemen} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input disabled={!this.state.edit} type="text" defaultValue={kategori} id="textKategori" innerRef={elemen => this.inKategori = elemen} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input disabled={!this.state.edit} type="number" defaultValue={harga} id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        {this.printStock()}
                    </FormGroup>
                    <FormGroup>
                        <Label>Images</Label>
                        {this.printImages()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.edit ?
                            <Button type="button" color="primary" onClick={() => this.setState({ edit: !this.state.edit })}>Save</Button>
                            : <Button type="button" color="primary" onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
                    }
                    <Button color="secondary" onClick={() => {
                        this.setState({ edit: !this.state.edit })
                        this.props.btClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalEditProduct;