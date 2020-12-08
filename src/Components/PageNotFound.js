import React from 'react'

function PageNotFound() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template text-center p-5" style={{ color: '#ffffff' }}>
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
