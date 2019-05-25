<template>
<!--หน้านี้ไม่ได้ใช้-->
  <v-app>
    <v-content>
        <v-container>
        <!--Use the component in the right place of the template-->
            <tiptap-vuetify
            :extensions="extensions"
            />
        </v-container>
    </v-content>
  </v-app>
</template>

<script src="https://unpkg.com/tiptap-vuetify"></script>
<script>
// import the component and the necessary extensions
import { TiptapVuetify, 
        Heading, 
        Bold, 
        Italic, 
        Strike, 
        Underline, 
        Paragraph, 
        BulletList, 
        OrderedList,
        ListItem, 
        HardBreak, 
        HorizontalRule, 
        History
} from 'tiptap-vuetify'
 
export default {
  // specify in the list of components
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      // you can specify options for extension
      new Heading({
        levels: [1, 2, 3]
      }),
      new Bold(),
      new Italic(),
      new Strike(),
      new Underline(),
      new Paragraph(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new HardBreak(),
      new HorizontalRule(),
      new History()
    ],
    // starting content for the editor
    content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
    `
  })
}
</script>