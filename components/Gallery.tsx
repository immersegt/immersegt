import '../styles/gallery.css';
import DSC0050_1 from '../public/DSC0050_1.png';
import DSC0064 from '../public/DSC0064.png';
import DSC05581 from '../public/DSC05581.png';
import DSC05722 from '../public/DSC05722.png';
import DSC9950 from '../public/DSC9950.png';
import DSC9961 from '../public/DSC9961.png';

const Gallery = () => {
    return (
        <section className="galleryContainer">
            <h2>
                Photo Gallery
            </h2>
            <div className="imageGallery">
                <img src={DSC0050_1.src} alt="DSC0050_1" />
                <img src={DSC0064.src} alt="DSC0064" />
                <img src={DSC05581.src} alt="DSC05581" />
                <img src={DSC05722.src} alt="DSC05722" />
                <img src={DSC9950.src} alt="DSC9950" />
                <img src={DSC9961.src} alt="DSC9961" />
            </div>
        </section>
    );
}

export default Gallery;