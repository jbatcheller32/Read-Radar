const Footer = () => {

    const styles = {
        footerStyle: {
            display: 'flex',
            justifyContent: 'center'
        },
    }; 

    return (

        <footer className="footer" style={styles.footerStyle}>

            <h3 className="footer">
                This is our footer
            </h3>

        
        </footer>


    )
}

export default Footer;