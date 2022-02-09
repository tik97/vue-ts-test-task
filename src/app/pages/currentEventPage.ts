import axios from "axios";
import {Component, UI} from "../app/ui";

@Component({
    // language=Vue
    template: `
        <v-container fluid class="selectable">
          <table>
            <tr>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Количество</th>
              <th>Название</th>
              <th>Комментарий</th>
              <th>Период</th>
            </tr>
            <tr>
              <td>{{ currentEvent.date }}</td>
              <td>{{ currentEvent.totalAmount }}</td>
              <td>{{ currentEvent.quantity }}</td>
              <td>{{ currentEvent.label }}</td>
              <td>{{ currentEvent.comment }}</td>
              <td>{{ currentEvent.period }}</td>
            </tr>
          </table>
        </v-container>
    `,
})
export class CurrentEventPage extends UI {

    private currentEvent: object = [];

    created(): void {
        this.currentEvent = this.$route.params;

        if (Object.keys(this.$route.params).length) {
            localStorage.setItem("event", JSON.stringify(this.currentEvent));
        } else {
            this.currentEvent = JSON.parse(localStorage.getItem("event"));
        }
    }
}
