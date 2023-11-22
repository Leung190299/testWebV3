import Modal from '@/libs/modal';
import { useEffect } from 'react';

import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { Connector } from '@pit-ui/modules/database-ver2';
import { connector } from './init';
import ModalDatabase from './modal-database';
import { User, seedingUsers } from '../../services/user/model';
import { stringToASCII } from '@/utilities/string';

import defaultUser from '@/mock/users.json';
import { Address } from '@/services/address/model';

type Props = {};

let connectPromise: any;
const DatabaseRegister = (props: Props) => {
  const isOpen = useBoolean();

  useEffect(() => {
    async function connect() {
      try {
        connectPromise = await connector.connect();
        window.dbConnector = connector;
        const countRequest = User.getTransaction(User.table.name, 'readwrite' as any)
          .objectStore(User.table.name)
          .count();

        countRequest.onsuccess = async () => {
          try {
            const number = countRequest.result;
            (User as any).transaction = null;
            if (number < 20) {
              const names: string[] = await fetch('https://raw.githubusercontent.com/duyet/vietnamese-namedb/master/girl.txt')
                .then((r) => r.text())
                .then((d) => d.split('\n'));
              for (const user of seedingUsers(10)) {
                user.name = names[Math.floor(Math.random() * names.length)];
                user.email = stringToASCII(user.name).normalize('NFC').toLocaleLowerCase().replaceAll(' ', '_') + '@gmail.com';
                const responseUser = await User.create(user);
                const address = defaultUser.address[0];
                address.user_id = responseUser.id;
                delete (address as any).id;
                await Address.create(address);
              }
            }
          } catch (error) {
            console.log(error);
          }
        };
      } catch (error) {
        console.log(error);
      }
    }
    !connectPromise && (connectPromise = connect());

    return () => {
      Connector.databaseInstance?.close();
    };
  }, []);

  useEffect(() => {
    let clicked = 0,
      lastClick = 0;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        isOpen.toggle();
      }
    }
    function handleTouchStart(event: TouchEvent) {
      let current = Date.now();
      if (current - lastClick > 200) {
        clicked = 1;
      } else {
        clicked++;
        if (clicked > 2) {
          clicked = 0;
          isOpen.setTrue();
        }
      }
      lastClick = current;
    }
  
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <Modal className="modal-full" classNameOverlay="bg-neutral-0" open={isOpen.value} setOpen={() => void 0}>
      <Modal.ModalBody className="modal-box shadow-itel bg-base-100">
        <ModalDatabase onClose={isOpen.setFalse} />
      </Modal.ModalBody>
    </Modal>
  );
};

export default DatabaseRegister;
