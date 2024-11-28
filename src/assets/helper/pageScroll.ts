/**
 * record scroll position, ready to restore after redirect
 */
 import { onActivated, ref } from 'vue'

 const useScroll = () => {
   /** @type {import('vue').Ref<HTMLDivElement | undefined>} */
   const el = ref()
 
   /** record last top position */
   let lastTop = 0
 
   const handleScroll = () => {
     if (el.value) lastTop = el.value.scrollTop
   }
 
   onActivated(() => {
     const $ = el.value
     if ($) $.scrollTop = lastTop
   })
 
   return { el, handleScroll }
 }
 
 export default useScroll
 