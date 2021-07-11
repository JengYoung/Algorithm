const $app = document.querySelector('.app');
const baseUrl = 'https://0d22xhjkba.execute-api.ap-northeast-2.amazonaws.com/dev';
const keyword = {
    "제목": null,
    "카테고리": null,
    "요일": [],
    "기타": [],
};

class App {
    constructor($app) {
        this.$app = $app;
    }
}

class Filters {
    constructor($app, baseUrl, keyword) {
        this.$app = $app
        this.baseUrl = baseUrl;
        this.keyword = keyword;
        this.render();
    }
    async render() {
        const $filterSearchBar = (() => {
            const { $filter, $filterTitle, $filterValues } = this.customCreateFilter();
            $filterTitle.textContent = '제목';
            const $input = document.createElement('input');
            $input.setAttribute('type', 'text');
            $input.setAttribute('spellcheck', 'false');
            $input.setAttribute('data-ms-editor', 'true');
            $filterValues.appendChild($input);
            $filter.appendChild($filterTitle);
            $filter.appendChild($filterValues);
            return $filter;
        })()

        const $filterCategory = await (async () => {
            const { $filter, $filterTitle, $filterValues } = this.customCreateFilter();
            $filterTitle.textContent = '카테고리';
            const datas = await this.getCategoryDatas();
            datas.forEach((data) => {
                const $label = this.customCreateLabel('radio', data);
                $filterValues.appendChild($label);
            });
            $filter.appendChild($filterTitle);
            $filter.appendChild($filterValues);

            return $filter;
        })();
        const $filterUpdateDays = (() => {
            const { $filter, $filterTitle, $filterValues } = this.customCreateFilter();
            $filterTitle.textContent = '요일';
            const days = ['월', '화', '수', '목', '금', '토', '일'];
            days.forEach((day) => {
                const $label = this.customCreateLabel('checkbox', day);
                $filterValues.appendChild($label);
            })
            $filter.appendChild($filterTitle);
            $filter.appendChild($filterValues);
            return $filter;
        })();
        const $filterOthers = (() => {
            const { $filter, $filterTitle, $filterValues } = this.customCreateFilter();
            $filterTitle.textContent = '기타';
            const $label = this.customCreateLabel('checkbox', '완결여부');
            $filterValues.appendChild($label);
            $filter.appendChild($filterTitle);
            $filter.appendChild($filterValues);
            return $filter;
        })()
        const $filterButtons = (() => {
            const $filterButtons = document.createElement('div');
            $filterButtons.className = 'filter-buttons';
            const $reset = document.createElement('button');
            $reset.className = "reset";
            $reset.textContent = "리셋"
            $reset.setAttribute('type', 'button');
            const $submit = document.createElement('button');
            $submit.className = "submit";
            $submit.textContent = "검색";
            $filterButtons.appendChild($reset);
            $filterButtons.appendChild($submit);
            return $filterButtons;
        })()

        const $filters = document.querySelector('.filters');

        $filters.appendChild($filterSearchBar);
        $filters.appendChild($filterCategory);
        $filters.appendChild($filterUpdateDays);
        $filters.appendChild($filterOthers);
        $filters.appendChild($filterButtons);
        this.handleEvents();
    }
    // filter 및 자식 요소들을 생성합니다.
    customCreateFilter() {
        const $filter = document.createElement('section');
        $filter.className = 'filter';
        const $filterTitle = document.createElement('div');
        $filterTitle.className = 'filter-title';
        const $filterValues = document.createElement('div');
        $filterValues.className = 'filter-values';
        return { $filter, $filterTitle, $filterValues };
    }
    // label 및 자식 요소를 생성합니다.
    customCreateLabel(type, value) {
        const $label = document.createElement('label');
        const $input = document.createElement('input');
        $input.setAttribute('type', type);
        $input.setAttribute('name', 'single-select');
        $input.setAttribute('value', value);
        $label.appendChild($input);
        $label.innerHTML += value;
        return $label;
    }
    // 카테고리 데이터를 fetch를 이용하여 가져옵니다.
    async getCategoryDatas() {
        try {
            const res = await fetch(`${baseUrl}/categories`);
            return await res.json();
        } catch (e) {
            throw new Error("카테고리 데이터를 가져오는 데 오류가 발생했습니다.", e);
        }
    }

    handleEvents() {
        const filterClickHandler = (e) => {
            const currentTarget = e.currentTarget;
            const [ $title, $filterValues ] = currentTarget.children;
            const type = $title.innerText;

            if(type === "요일" || type === "기타") {
                const keywords = [];
                const labels = $filterValues.childNodes;
                labels.forEach((label) => {
                    const input = label.childNodes[0];
                        if (input.checked === true) {
                            keywords.push(input.value);
                    }
                })
                this.keyword[type] = keywords;
            }
            else this.keyword[type] = e.target.value;
        }
        const $filter = document.querySelectorAll('.filter');
        $filter.forEach((elem) => {
            elem.addEventListener('change', filterClickHandler)
        })

        const submitHandler = (e) => {
            e.preventDefault();
            new WebtoonList(this.keyword, this.baseUrl, this.$app);
        }
        const $filters = document.querySelector('.filters');
        $filters.addEventListener('submit', submitHandler)
    }
}

class WebtoonList {
    constructor(keyword, baseUrl, $app) {
        this.keyword = keyword;
        this.$app = $app;
        this.baseUrl = baseUrl;
        this.queryTypes = {
            "제목": "title",
            "카테고리": "category",
            "요일": "updateDays",
            "기타": {
                "완결여부": "isEnded"
            }
        }
        this.queries = [];
        this.render();
    }
    async render() {
        const keys = Object.keys(this.keyword);
        keys.forEach(key => {
            if (key === "기타") {
                this.keyword[key].forEach(each => {
                    this.queries.push(`this.queryTypes[key][each]=True`);
                })
            }
        })
    }
}

new Filters($app, baseUrl, keyword);
