import React from 'react';
import { Carousel, CarouselIndicators, CarouselControl, CarouselItem, CarouselCaption, UncontrolledCarousel, Container, Col, Row } from 'reactstrap';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <UncontrolledCarousel style={{ width: "50px" }}
                    items={[
                        {
                            altText: 'Slide 1',
                            caption: 'Slide 1',
                            // key: 1,
                            src: 'https://images.tokopedia.net/img/cache/1200/BgtCLw/2021/1/26/1e9c6dc1-f7c4-4bec-aa17-c0fd97e9039c.jpg.webp?ect=4g'
                        },
                        {
                            altText: 'Slide 2',
                            caption: 'Slide 2',
                            // key: 2,
                            src: 'https://webby-gallery-production.s3.amazonaws.com/uploads/asset/image/entry-asset-8471/entry_id_144107_idx_0_asset_id_2012.jpg'
                        },
                        {
                            altText: 'Slide 3',
                            caption: 'Slide 3',
                            // key: 3,
                            src: 'https://picsum.photos/id/678/1200/600'
                        }
                    ]}
                />

                <Container className="my-5">
                    <Row>
                        <Col className="col-md-6">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg"/>
                        </Col>
                        <Col className="col-md-6 d-flex flex-column justify-content-center px-4">
                            <h2>IDANÄS</h2>
                            <h3>IKEA | Rangka tempat tidur</h3>
                            <p className="text-justify">Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  
                                Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  
                                Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  
                                Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.</p>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-6 d-flex flex-column justify-content-center px-4">
                            <h2>HAUGA V.3</h2>
                            <h3>IKEA | Mr. DYI</h3>
                            <p className="text-justify">Mudah untuk menyembunyikan kabel dan stopkontak tapi tetap dapat dijangkau dengan jalur kabel di bagian belakang..</p>

                        </Col> 
                        <Col className="col-md-6 d-flex justify-content-center">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/727/0972709_PE811745_S4.jpg"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-6">
                            <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg"/>
                        </Col>
                        <Col className="col-md-6 d-flex flex-column justify-content-center">
                            <h2>IDANÄS</h2>
                            <h3>IKEA | Rangka tempat tidur</h3>
                            <p className="text-justify">Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  
                                Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  
                                Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  
                                Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.</p>

                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default HomePage;