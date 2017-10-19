# vuex-book

对网上的笔记应用做了一个完善，对一些bug进行了修改，对没有完成的功能进行相应的完善和扩展，加深一些vuex的理解

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##### 修改笔记内容

使用一下代码

```html
<template>
    <div id="note-editor">
        <input type="text" v-model="activeHeader" placeholder="标题" class="form-control" disabled>
        <textarea @input="editNote" v-model="activeText" placeholder="笔记内容"></textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  name: 'editor',
  computed: {
    ...mapState({
      activeHeader: state => state.activeNote.header,
      activeText: state => state.activeNote.text
    })
  },
  methods: {
    editNote (e) {
      this.$store.commit('EDIT_NOTE', e.target.value)
    }
  }
}
</script>
<style>
#note-editor textarea {
  height: 100%;
  border: 0;
  border-radius: 0;
  width: 100%
}
</style>
```

当在textarea更改内容的时候出现这个错误。

```javascript
Computed property "activeText" was assigned to but it has no setter.
```

解决方案一(修改后的代码)



```html
<template>
    <div id="note-editor">
        <input type="text" v-model="active.activeHeader" placeholder="标题" class="form-control" disabled>
        <textarea @input="editNote" v-model="active.activeText" placeholder="笔记内容"></textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  name: 'editor',
  computed: {
    ...mapState({
      active: state => state.activeNote // 修改后的代码
    })
  },
  methods: {
    editNote (e) {
      this.$store.commit('EDIT_NOTE', e.target.value)
    }
  }
}
</script>
<style>
#note-editor textarea {
  height: 100%;
  border: 0;
  border-radius: 0;
  width: 100%
}
</style>
```

解决方案二

```html
<template>
    <div id="note-editor">
        <input type="text" v-model="activeHeader" placeholder="标题" class="form-control" disabled>
        <textarea @input="editNote" v-model="activeText" placeholder="笔记内容"></textarea>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  name: 'editor',
  computed: {
    ...mapState({
      activeHeader: state => state.activeNote.header
    }),
    // 修改后的代码
    activeText: {
      get: function () {
        return this.$store.state.activeNote.text
      },
      set: function (newValue) {
        this.$store.state.activeNote.text = newValue
      }
    }
  },
  methods: {
    editNote (e) {
      this.$store.commit('EDIT_NOTE', e.target.value)
    }
  }
}
</script>
<style>
#note-editor textarea {
  height: 100%;
  border: 0;
  border-radius: 0;
  width: 100%
}
</style>
```

#### 删除笔记

store.js

```javascript
//省略 ......
// 删除笔记
  DEL_NOTE (state) {
  	if (state.notes.length > 0) {
  		let index = state.notes.indexOf(state.activeNote) // 获取活动笔记的位置
  		state.notes.splice(index, 1) // 删除
  		// 如果删除后笔记数组还有值就默认设置第一个为活动笔记
  		if (state.notes.length > 0) state.activeNote = state.notes[0]
  	}
  }
// 省略 .....
const actions = {
  addNote ({commit}) {
    commit('ADD_NOTE')
  },
  addFavorite ({commit}) {
    commit('ADD_FAVORITE')
  },
  // 删除笔记
  delNote ({commit}) {
  	commit('DEL_NOTE')
  }
}
```

#### 把笔记设置为我喜欢或移除我喜欢

store.js

```javascript
  //省略 ......
  // 标记为喜欢
  ADD_FAVORITE (state) {
    for (let val of state.notes) {
      if (val === state.activeNote) {
      	val.favorite = !val.favorite
      }
    }
  },
  //省略 ......
```

#### 页面所有和我喜欢的切换

采用getters进行动态的过滤数据store.js

```javascript
//省略 ......
// 记录活动在所有笔记还是在喜欢
  ALL_FAVOR (state, type) {
    state.notesType = type
  }
//省略 ......
const getters = {
// 过滤所有笔记和喜欢的笔记
  getNotes (state) {
  	if (state.notesType === 'all') {
  		return state.notes
  	} else {
	  	return state.notes.filter(data => data.favorite)
  	}
  }
}
//省略 ......
```

切换后会触发store中的notesType的值,从而过滤掉favorite为false或者true，最好的效果