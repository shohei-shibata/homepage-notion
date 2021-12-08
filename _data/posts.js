const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

module.exports = async function() {
	console.log("databaseId", databaseId)
	try {
		const response = await notion.databases.query({
			database_id: databaseId
		});
		console.log("Notion response: ", response.results[1].properties.Slug.rich_text[0].plain_text)
		const posts = await response.results.map(item => {
			return {
				title: item.properties.Name.title[0].plain_text,
				slug: item.properties.Slug.rich_text[0].plain_text
			}
		});
		return posts;
	} catch (error) {
		console.error(error.body)

		return error.body;
	}
}
