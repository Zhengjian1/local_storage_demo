
const rules = []

function addLoader(defauleModuleLoader) {

    const string_replace_loader = {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
            multiple: [
                { search: 'window.localStorage.setItem', replace: 'window.local_storage_demo.set' },
                { search: 'localStorage.setItem', replace: 'window.local_storage_demo.set' },
                { search: 'window.localStorage.getItem', replace: 'window.local_storage_demo.get' },
                { search: 'localStorage.getItem', replace: 'window.local_storage_demo.get' },
                { search: 'window.localStorage.removeItem', replace: 'window.local_storage_demo.remove' },
                { search: 'localStorage.removeItem', replace: 'window.local_storage_demo.remove' },
                { search: 'window.localStorage.clear', replace: 'window.local_storage_demo.clear' },
                { search: 'localStorage.clear', replace: 'window.local_storage_demo.clear' },
            ]
        }
    }

    rules.push(string_replace_loader)

    return rules;

}


module.exports = addLoader;