<script>
  import DoneIcon from '@/assets/icon/inlineSvg/icon-check-small-line.svg';
  import EditIcon from '@/assets/icon/inlineSvg/icon-pencil-small-line.svg';
  import DeleteIcon from '@/assets/icon/inlineSvg/icon-bin-small-line.svg';

  export const IconName = [
    'DoneIcon',
    'EditIcon',
    'DeleteIcon',
  ]

  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        default: null,        
      }
    },
    components: {
      DoneIcon,
      EditIcon,
      DeleteIcon,
    }
  }
</script>