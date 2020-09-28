
const rules = []

function addLoader(defauleModuleLoader) {

    const string_replace_loader = {
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
            multiple: [
                { search: 'window.localStorage.setItem', replace: 'zj_local_storage.set' },
                { search: 'localStorage.setItem', replace: 'zj_local_storage.set' },
                { search: 'window.localStorage.getItem', replace: 'zj_local_storage.get' },
                { search: 'localStorage.getItem', replace: 'zj_local_storage.get' },
                { search: 'window.localStorage.removeItem', replace: 'zj_local_storage.remove' },
                { search: 'localStorage.removeItem', replace: 'zj_local_storage.remove' },
                { search: 'window.localStorage.clear', replace: 'zj_local_storage.clear' },
                { search: 'localStorage.clear', replace: 'zj_local_storage.clear' },
            ]
        }
    }

    rules.push(string_replace_loader)

    return rules;

}


module.exports = addLoader;