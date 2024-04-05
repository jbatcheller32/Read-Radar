import githubLogo from '../../assets/github-mark.png';

const Footer = () => {

    const githubLink = [
        {
          username: 'jbatcheller32',
          url: 'https://github.com/jbatcheller32/Read-Radar'
        }
      ];
    

    const styles = {
        footerStyle: {
            display: 'flex',
            justifyContent: 'center',
            height: '25px'
        },
        imageStyle: {
            height: '50px',
            marginTop: '50px'
        },
    }; 

    return (

            <div>
              <footer className="footer" style={styles.footerStyle}>
                <div className="container">
                  <div className="row">
                    {githubLink.map((link, index) => (
                      <div key={index} className="col-md-4">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <img src={githubLogo} alt={link.username} className='footer-image' style={styles.imageStyle} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </footer>
            </div>


    )
}

export default Footer;