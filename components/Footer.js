import _ from "../styles/Footer.module.scss";

const Footer = () => {
    return (
        <footer className={_.footer}>
            {/* <div className={_.container}> */}
            {/*     <div className={_.rows}> */}
            {/*         <div className={_.cols}> */}
            {/*             <h4> Company </h4> */}
            {/*             <ul> */}
            {/*                 <li><a href=""> About Us </a></li> */}
            {/*                 <li><a href=""> Other Services </a></li> */}
            {/*                 <li><a href=""> Our Internship Programs </a></li> */}
            {/*             </ul> */}
            {/*         </div> */}
            {/*         <div className={_.cols}> */}
            {/*             <h4> Get Help</h4> */}
            {/*             <ul> */}
            {/*                 <li><a href=""> FAQ </a></li> */}
            {/*                 <li><a href=""> Privacy Policy </a></li> */}
            {/*                 <li><a href=""> Terms And Conditions</a></li>   */}
            {/*             </ul> */}
            {/*         </div> */}
            {/*         <div className={_.cols}> */}
            {/*             <h4> Join Us </h4> */}
            {/*             <div className="social"> */}
            {/*                 <a className={_.fb} href=""></a> */}
            {/*                 <a className={_.tweet} href=""></a> */}
            {/*                 <a className={_.insta} href=""></a> */}
            {/*                 <a className={_.linkdn} href=""></a> */}
            {/*             </div> */}
            {/*         </div> */}
            {/*     </div> */}
            {/* </div> */}
            <form className={_.feedback}>
                <input type="text" placeholder="Leave a message for us" />
                <input type="button" value="Send" />
            </form>
            <div className={_.signature}>
                <p>
                    Handcrafted with{" "}
                    <span style={{ color: "red", fontSize: "1.2em" }}>❤</span>{" "}
                    by LamiFY and Vishal
                </p>
            </div>
        </footer>
    );
};

export default Footer;
