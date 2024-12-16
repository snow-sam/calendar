'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

const Tiptap = () => {
  const editor = useEditor({
    autofocus: "start",
    editorProps: {
      attributes: {
        class: 'bg-background h-[100dvh] p-4 py-2 space-y-2'
      }
    },
    extensions: [
      Document,
      Text,
      Paragraph,
      Heading,
      HorizontalRule,
      Blockquote,
      BulletList,
      ListItem,
      TaskItem,
      TaskList
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
