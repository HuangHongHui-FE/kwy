<template>
	<div>
		个人资料
	</div>
</template>


<script>
	export default{
		data(){
			return {
				
			}
		},
		async created(){
			const res = await this.$http.get("kwy/grzl")
			console.log(res)
			// console.log(res.data)
		}
	}
</script>

<style lang="less" scoped></style>