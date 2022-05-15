// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

//класс карточки курса
class Course {
    constructor(name, prices, id) {
        this.name = name;
        this.prices = prices;
        this.filtered = {}
        this.id = id;
    }
    render() {
        let to = this.prices[1];
        if (to == Infinity) to = '+';
        return `<div class="course" id="${this.id}"><h3>${this.name}</h3><p>Price: ${this.prices[0]} to ${to}</p></div>`
    }
}

//класс списка карточек
class CoursesList {
    constructor() {
        this.courses = [];
        this.filtered = [];
    }
    //объявление массива
    fetchCourses() {
        this.courses = [
            { name: "Courses in England", prices: [0, 100] },
            { name: "Courses in Germany", prices: [500, null] },
            { name: "Courses in Italy", prices: [100, 200] },
            { name: "Courses in Russia", prices: [null, 400] },
            { name: "Courses in China", prices: [50, 250] },
            { name: "Courses in USA", prices: [200, null] },
            { name: "Courses in Kazakhstan", prices: [56, 324] },
            { name: "Courses in France", prices: [null, null] },
        ]
    }
    //инициализация
    init(filtered) {
        this.filtered = filtered;
        this.fetchCourses();
        this.render()
        this.filter();
    }
    //отрисовка html
    render() {
        let listHtml = '';
        this.filtered.forEach(good => {
            good.prices.forEach((price, index) => {
                if ((price == null) && (index == 0)) {
                    good.prices.splice(index, 1, '0')
                }
                if ((price == null) && (index == 1)) {
                    good.prices.splice(index, 2, Infinity)
                }
            })
            good.id = Math.floor(Math.random() * 1000);
            const goodItem = new Course(good.name, good.prices, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector('.courses-list').innerHTML = listHtml;
    }

    //действия с объектом: сортировка, фильтр и сброс
    filter() {
        // фильтр по диапазону значений
        document.querySelector('.button-search').addEventListener('click', () => {
            let low = +document.querySelector(".low").value;
            let high = +document.querySelector(".high").value;
            if (!low) low = 0;
            if (!high) high = Infinity;
            this.filtered.forEach(good => {
                const block = document.querySelector(`.course[id="${good.id}"]`);
                if (((good.prices[0] > high) || (good.prices[1] < low))) {
                    block.classList.add('invisible')
                }
                else {
                    block.classList.remove('invisible')
                }
            })
        })

        //сортировка по цене от меньшего
        document.querySelector('.button-filter').addEventListener('click', () => {
            var FromTo = this.courses.slice(0);
            FromTo.sort(function (a, b) {
                return a.prices[0] - b.prices[0];
            });
            this.init(FromTo);
        })

        //сброс состояния фильтра и сортировки
        document.querySelector('.button-reset').addEventListener('click', () => {
            this.filtered.forEach(good => {
                const block = document.querySelector(`.course[id="${good.id}"]`);
                block.classList.remove('invisible')
            })
            this.init(this.courses)
        })
    }
}


const list = new CoursesList();
list.fetchCourses();
list.init(list.courses);