import Banner from "../Pages/banner";
import Package from "../Pages/Package";
import ServicesDemo from "../Pages/ServicesDemo";
import Slider from "../Pages/slider";
import WhyUs from "../Pages/WhyUs";

const Home = () => {
    return (
        <div>
            <Banner/>
            <ServicesDemo/>
            <Package/>
            <WhyUs/>
            <Slider/>
        </div>
    );
}

export default Home;
