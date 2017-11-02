<template>
    <div>动态路由配置{{$route.params.id}}
        <h1>路由附带的一些参数</h1>
       <p>$route.query{{$route.query}}</p> 
       <p>$route.hash{{$route.hash}}</p> 
    </div>
</template>