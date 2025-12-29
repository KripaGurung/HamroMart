import HeroSection from  "../../componennt/HeroSection/HeroSection";
import Electronics from "../../componennt/Electronics/Electronics";
import Beauty from "../../componennt/Beauty/Beauty";
import Women from "../../componennt/Womenwear/Women";
import Category from "../../componennt/category/Category";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Category />
            <Women />
            <Electronics />
            <Beauty/>
        </div>
    )
}

export default Home;