var dbconfig = {
	appKey : "265C37BE-9738-06FA-E6C3-0354B480FEE6"
};

var initConfig = function() {
	var model = api.require('model');
	model.config(dbconfig);
};

function factory(modelName) {
	var appId = 'A6976438390790';
	var key = 'CA53C97A-F48F-DBDC-2921-7B9208B22BAA';
	var client = new Resource(appId, key);
	if ($api.getStorage('token')) {
		client.setHeaders("authorization", $api.getStorage('token'));
	}
	return client.Factory(modelName);
}