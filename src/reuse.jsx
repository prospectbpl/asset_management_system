<div className="col-xl-3 col-md-6 mb-4">
<div className="card border-left-success shadow h-100 py-2">
    <div className="card-body">
        <div className="row no-gutters align-items-center">
            <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1" style={{ fontSize: '1rem' }}>
                    Total Asset</div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssetCount}</div> {/* Updated amount */}
            </div>
            <div className="col-auto">
                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
        </div>
        <div className="row no-gutters align-items-center">
            <div className="col-md-12">
                <hr className="my-2" /> {/* Line added here */}
                <div className="stats">
                    <i className="fa fa-angle-double-right text-success"></i>
                    <span><Link className="text-success" to="/assetlist">More info</Link></span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>