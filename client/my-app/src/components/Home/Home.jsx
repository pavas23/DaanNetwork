import HomeNav from './HomeNav';
import HomeCarousel from './HomeCarousel';
import "../../css/Home/home.css"

export default function Home() {
    return (
        <div>
            <HomeNav/>
            <HomeCarousel/>
            <div className='main_body'>
                <div className='aboutUs'>
                    <h2 style={{color:"#078534",fontWeight:"bold", fontSize:"250%"}}>About Us</h2>
                    <div className='writeUp'>
                        <p>
                            Welcome to DaanNetwork where we are passionate about connecting donors with NGOs to facilitate food donations 
                            and fight hunger. We are a team of Five Students from BITS Pilani Hyderabad Campus who have undertaken this initiative 
                            as part of course project for our elective course, Software Engineering. As students we were really alarmed by the 
                            sheer amount of food that goes to waste every day, while millions of people go hungry. A major example of this being
                            our own college mess where quite a lot of food goes to waste every day. We wanted to do something about it 
                            and that's how DaanNetwork was born.
                        </p>
                        <p>
                            Our team is dedicated to creating a platform that bridges the gap between surplus food and 
                            those in need, empowering individuals and organizations to make a meaningful impact on their communities.
                            Founded with a vision to address the pressing issue of food insecurity, our team brings together a diverse 
                            set of skills and experiences. From web development and design to social activism and humanitarian work, we 
                            unite under a common goal: to leverage technology for good and create positive change in the world.
                        </p>
                        <p>
                            Driven by the belief that everyone deserves access to nutritious food, we strive to make the donation process 
                            as seamless and efficient as possible. Whether you're a donor looking to contribute surplus food or an NGO 
                            seeking support, our platform provides the tools and resources you need to make a difference.
                            Driven by the belief that everyone deserves access to nutritious food, we strive to make the donation process 
                            as seamless and efficient as possible.
                        </p>
                        <p>
                            But we can't do it alone. Our platform thrives on collaboration, and we invite you to join us in our mission. 
                            Whether you're a donor, an NGO, or simply someone who wants to make a difference, together, we can create a 
                            world where no one goes hungry. Together, let's turn compassion into action and make a lasting impact on the 
                            lives of others.
                        </p>
                    </div>
                </div>
                <div className='line'></div>
                <div className='impact'>
                    <h2 style={{color:"#078534",fontWeight:"bold", fontSize:"250%"}}>Impact Stories</h2>
                </div>
                <div className='line'></div>
                <div className='contact'>
                    <h2 style={{color:"#078534",fontWeight:"bold", fontSize:"250%"}}>Contact Us</h2>
                </div>
            </div>
        </div>
    );
}