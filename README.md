## Играемся с микрофронтендами

#### Запуск хоста

`cd host-redux` приложение с хостом

`yarn install` ставим зависимости

`yarn start` запуск хоста на http://localhost:4000

#### Запуск ремоута

`cd ../remote3-prime-react` (из папки с хостом)

`yarn install` ставим зависимости

`yarn start` запуск ремоута на http://localhost:4001

### Диспатч ивентов

Для событий лучше создать какую-то шину, да и сами события хранить в константах

#### Триггер ивентов
```tsx
const handleClick = () => {
        document.dispatchEvent(
            new CustomEvent('host:root-generate-message-event', {
                detail: {
                    // объект с любыми данными, которые мы передаём в событии
                },
            })
        );
    };
```

```tsx
import { useEventListener } from '@hooks';

// на хосте слушаем событие которое триггерится в ремоуте
useEventListener(
	'host:root-generate-message-event',
	(event: EventListener) => {
		console.log(event);
	}
);
```



