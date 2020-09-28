
const rules = []

function addLoader(defauleModuleLoader) {

    const string_replace_loader = {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
            multiple: [
                { search: 'window.localStorage.setItem', replace: 'local_storage_demo.set' },
                { search: 'localStorage.setItem', replace: 'local_storage_demo.set' },
                { search: 'window.localStorage.getItem', replace: 'local_storage_demo.get' },
                { search: 'localStorage.getItem', replace: 'local_storage_demo.get' },
                { search: 'window.localStorage.removeItem', replace: 'local_storage_demo.remove' },
                { search: 'localStorage.removeItem', replace: 'local_storage_demo.remove' },
                { search: 'window.localStorage.clear', replace: 'local_storage_demo.clear' },
                { search: 'localStorage.clear', replace: 'local_storage_demo.clear' },
            ]
        }
    }

    rules.push(string_replace_loader)

    return rules;

}


module.exports = addLoader;