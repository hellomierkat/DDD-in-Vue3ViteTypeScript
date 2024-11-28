本项目demo属于领域驱动设计（DDD）在web前端项目中的探索。

起因：
   1，前端对业务知识太多离散  
   2，大多人员属于API请求+页面编码人员。 
这些都使得项目和团队稳健性不高

项目的实践基础： 
   1, 前端构建[API接口]、[Dto传输对象]、[Domain充血的业务模型对象] + [CQRS 命令查询分离]
   2, 事件方法将全部由Domain业务模型携带并发起, 不会游离到页面中, 实现业务的集中管理. 
   
项目的实践思路：
   1，查询： 查询API（来自Domain中的查询模块） -> Dto 传输对象 -> 实例化为Domain对象（不同的页面将实例化同一个模型对象, 模型对象直接可用于渲染页面）
   2，命令: 构建input类的Dto class对象 -> 构建Domain模型 ->调用Domain中的API提交数据 -> 填充/回写Domain模型 -> 响应页面


优势: 
   1, 项目的健壮性极大增强
   2, 业务较容易实现模块化
   3, 从页面式的编码变为面向对象式, 一定程度上回避了冗杂重复性代码
   4, 业务事件将由模型发起, 不再是页面中的事件发起


留言邮箱: hellomierkat@outlook.com 



# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
