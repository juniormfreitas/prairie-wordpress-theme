<?php 
get_header(); 
if ( have_posts() ) : 
    while ( have_posts() ) : the_post();
        the_title();
        the_permalink();
        the_excerpt();
    endwhile;
endif;
get_footer(); 
?>