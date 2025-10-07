"use client"

export function CodeView() {
  return (
    <div className="h-full rounded-lg border border-border bg-card p-6 overflow-auto">
      <pre className="text-xs font-mono text-foreground">
        <code>{`import { TiptapVeltComments } from '@velt/editor/tiptap-velt'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiptapComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'tiptap-angular';
  focusMode = false;

  editor = new Editor({
    extensions: [
      TiptapVeltComments.configure({
        persistVolatiles: false
      }),
      StarterKit,
      Placeholder,
      Underline,
      TextAlign,
      Image
    ],
    editorProps: {
      // ... editor configuration
    }
  });
}`}</code>
      </pre>
    </div>
  )
}
