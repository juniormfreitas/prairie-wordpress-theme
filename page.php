<?php 
get_header(); 
if (have_posts()) : the_post();
    the_title();
    the_content();
endif;
get_footer(); 
?>